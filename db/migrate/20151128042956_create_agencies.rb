class CreateAgencies < ActiveRecord::Migration
  def change
    create_table :agencies do |t|
      t.string :name
      t.text :address
      t.string :services
      t.text :description

      t.timestamps null: false
    end
  end
end
