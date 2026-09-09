FROM busybox:uclibc

COPY httpd.conf /etc/httpd.conf
COPY index.html kw.js /www/

# busybox httpd kann nicht rewriten (E404 ist nicht einkompiliert), also jede
# Route als echtes Verzeichnis: /7 -> 302 /7/ -> index.html. Hardlinks, kein Platz.
RUN for i in $(seq 1 53); do mkdir /www/$i && ln /www/index.html /www/$i/index.html; done

EXPOSE 80
CMD ["httpd", "-f", "-p", "80", "-h", "/www", "-c", "/etc/httpd.conf", "-u", "nobody"]
