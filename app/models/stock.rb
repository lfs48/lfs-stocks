class Stock < ApplicationRecord

    validates :ticker, uniqueness: {scope: :owner_id}

    belongs_to :owner,
        class_name: :User,
        primary_key: :id,
        foreign_key: :owner_id

end