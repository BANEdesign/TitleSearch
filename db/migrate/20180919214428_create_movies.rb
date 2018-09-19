class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :poster_path
      t.integer :id
      t.string :original_title
      t.string :overview
      t.string :release_date
      t.string :title
      t.integer :popularity

      t.timestamps
    end
  end
end
