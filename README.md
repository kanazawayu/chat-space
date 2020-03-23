# Chat-space DB設計
## usersテーブル
|Column|Type|Option|
|------|----|------|
|email|string|null: false|
|username|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups, through:  :users_groups

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|text|null: false|
|image|string|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupテーブル
|Column|Type|Option|
|------|----|------|
|groupname|string|null: false|
### Association
- has_many :messages
- has_many :users, through:  :users_groups

# users_groupsテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group