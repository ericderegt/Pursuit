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

ActiveRecord::Schema.define(version: 20150608024109) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "chapters", force: :cascade do |t|
    t.integer  "course_id"
    t.string   "title"
    t.string   "link"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "image_url",   default: "http://semantic-ui.com/images/wireframe/image.png"
    t.string   "description"
    t.datetime "created_at",                                                                null: false
    t.datetime "updated_at",                                                                null: false
  end

  create_table "playlists", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "playlists", ["course_id"], name: "index_playlists_on_course_id", using: :btree
  add_index "playlists", ["user_id", "course_id"], name: "index_playlists_on_user_id_and_course_id", unique: true, using: :btree
  add_index "playlists", ["user_id"], name: "index_playlists_on_user_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "course_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.boolean  "admin",           default: false
    t.string   "password_digest"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

end
