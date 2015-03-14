class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.string :overview
      t.string :description
      t.string :experience
      t.string :facts

      t.timestamps null: false
    end
  end
end
