To list movies stored in movies.json

curl --header "Content-Type: application/json"  http://localhost:3000/api/v1/list_movies


To create movies and store in movies.json

curl -H 'Accept: application/json' -H "Authorization: Bearer TOKEN" http://localhost:3000/api/v1/movies -d "{\"title\":\"rails\", \"description\":\"this is description\", \"cast\":\"rails\"}" 


To get the Authorization Token to be passed in the create request
curl --header "Content-Type: application/json"  http://localhost:3000/api/v1/get_token