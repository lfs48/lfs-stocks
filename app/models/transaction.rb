class Transaction < ApplicationRecord

    validates :purchaser_id, :ticker, :price, :quantity, presence: true

    belongs_to :purchaser,
        class_name: :User,
        primary_key: :id,
        foreign_key: :purchaser_id

end