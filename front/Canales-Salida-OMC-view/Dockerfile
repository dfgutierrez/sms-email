FROM node:12-alpine3.12 as builder 
ENV REACT_APP_API_SMS='#{Template.REACT_APP_API_SMS}#'
ENV REACT_APP_API_EMAIL='#{Template.REACT_APP_API_EMAIL}#'
ENV REACT_APP_SUBJECT='#{Template.REACT_APP_SUBJECT}#'
WORKDIR /builddir
COPY ./ /builddir/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.8-alpine AS prod-stage
COPY --from=builder /builddir/build /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 777 /var

RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html
RUN chgrp -R root /var/cache/nginx /usr/share/nginx/html

EXPOSE 8083
CMD ["nginx", "-g", "daemon off;"]













