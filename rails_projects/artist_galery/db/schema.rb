# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150702122738) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "art_items", force: :cascade do |t|
    t.string   "name",                null: false
    t.string   "source_file",         null: false
    t.string   "preview_source_file", null: false
    t.text     "description"
    t.decimal  "price"
    t.date     "in_date",             null: false
    t.date     "sold_date"
    t.float    "vertical_size"
    t.float    "horizontal_size"
    t.text     "keywords"
    t.integer  "style_id"
    t.integer  "media_id"
    t.integer  "category_id"
    t.integer  "orientation_id"
    t.integer  "subject_id"
    t.integer  "author_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "art_items_colors", id: false, force: :cascade do |t|
    t.integer "art_item_id", null: false
    t.integer "color_id",    null: false
  end

  create_table "authors", force: :cascade do |t|
    t.string   "first_name"
    t.string   "second_name",   null: false
    t.string   "info_about"
    t.string   "photo"
    t.string   "phone_number",  null: false
    t.string   "email_address", null: false
    t.integer  "city_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "authors", ["second_name"], name: "index_authors_on_second_name", using: :btree

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "categories", ["name"], name: "index_categories_on_name", using: :btree

  create_table "cities", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "colors", force: :cascade do |t|
    t.string   "name",                   null: false
    t.string   "hex_name",               null: false
    t.integer  "percentage", default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "colors", ["name"], name: "index_colors_on_name", using: :btree

  create_table "media", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "media", ["name"], name: "index_media_on_name", using: :btree

  create_table "orientations", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "orientations", ["name"], name: "index_orientations_on_name", using: :btree

  create_table "styles", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "styles", ["name"], name: "index_styles_on_name", using: :btree

  create_table "subjects", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "subjects", ["name"], name: "index_subjects_on_name", using: :btree

end
