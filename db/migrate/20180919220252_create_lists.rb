class CreateLists < ActiveRecord::Migration[5.1]
  def change
    create_table :lists do |t|
      t.integer :page
      t.string :results
      t.integer :total_results
      t.integer :total_pages

      t.timestamps
    end
  end
end
