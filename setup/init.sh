set -e

mongo <<EOF
db = db.getSiblingDB('masterplayer')

db.createUser({
    user: 'app',
    pwd: 'app',
    roles: [{ role: 'readWrite', db: 'masterplayer'}]
})
EOF