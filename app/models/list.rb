class List < ApplicationRecord
    has_many :movies
    serialize :results
end
