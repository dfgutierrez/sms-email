#!/bin/sh
sed -i "s/REACT_APP_API_SMS/$REACT_APP_API_SMS/g" /usr/share/nginx/html/main*.js && sed -i "s/REACT_APP_API_SMS/$REACT_APP_API_SMS/g" /usr/share/nginx/html/aro-canal-oms-view/main*.js && sed -i "s/REACT_APP_API_EMAIL/$REACT_APP_API_EMAIL/g" /usr/share/nginx/html/main*.js && sed -i "s/REACT_APP_API_EMAIL/$REACT_APP_API_EMAIL/g" /usr/share/nginx/html/aro-canal-oms-view/main*.js && sed -i "s/REACT_APP_SUBJECT/$REACT_APP_SUBJECT/g" /usr/share/nginx/html/main*.js && sed -i "s/REACT_APP_SUBJECT/$REACT_APP_SUBJECT/g" /usr/share/nginx/html/aro-canal-oms-view/main*.js

exec "$@"