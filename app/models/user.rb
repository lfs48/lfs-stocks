class User < ApplicationRecord

    after_initialize :ensure_session_token

    validates :email, :password_digest, :session_token, presence: true
    validates :email, :session_token, uniqueness: true
    validates :password, allow_nil: true, length: {minimum: 8}

    attr_reader :password

    has_many :owned_stocks,
        class_name: :Stock,
        primary_key: :id,
        foreign_key: :owner_id

    has_many :transactions,
        class_name: :Transaction,
        primary_key: :id,
        foreign_key: :purchaser_id

    # Looks up user in db by email, then validates provided password
    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user && user.is_password?(password)
            return user
        else
            return nil
        end
    end

    # Generates a random 16-char string, looping until the generated string isn't already an existing session token in db
    def self.generate_session_token
        token = SecureRandom.urlsafe_base64(16)
        user = User.find_by(session_token: token)
        while user
            token = SecureRandom.urlsafe_base64(16)
            user = User.find_by(session_token: token)
        end
        return token
    end

    # Generates a session token if the user doesn't already have one
    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    # Sets user's session token to a newly generated session token, then persists to db
    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        return self.session_token
    end

    # Sets the user's password digest to the provided password hashed and salted
    def password=(password)
        @password = password
        digest = BCrypt::Password.create(password)
        self.password_digest = digest
    end

    # Checks if provided password is the user's password
    def is_password?(password)
        digest = BCrypt::Password.new(self.password_digest)
        return digest.is_password?(password)
    end

    def can_afford(transaction)
        return self.balance >= transaction.price * transaction.quantity
    end

    def buy(transaction)
        if ( self.can_afford(transaction) )
            self.balance -= transaction.price * transaction.quantity
            self.save!
            stock = Stock.find_by(ticker: transaction.ticker, owner_id: self.id)
            if stock
                stock.update_shares(transaction.quantity)
            else
                stock_params = {owner_id: self.id, shares: transaction.quantity, ticker: transaction.ticker}
                stock = Stock.new(stock_params)
                stock.save!
            end
        else
            raise 'Insufficient funds'
        end
    end

end