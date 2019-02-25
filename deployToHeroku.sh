echo "Deploy is started";
heroku container:logout;
heroku container:login; 
heroku git:remote -a skills4you;
heroku container:push web;
heroku container:release web;
