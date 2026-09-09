FROM busybox:uclibc

COPY httpd.conf /etc/httpd.conf
COPY index.html kw.js /www/

# busybox httpd kann nicht rewriten (E404 ist nicht einkompiliert), also jede
# Route als echtes Verzeichnis: /7 -> 302 /7/ -> index.html. Hardlinks, kein Platz.
RUN for i in $(seq 1 53); do mkdir /www/$i && ln /www/index.html /www/$i/index.html; done

EXPOSE 80

# --spider lädt nichts, der Exitcode ist das Signal
HEALTHCHECK --interval=30s --timeout=3s --start-period=3s --retries=3 \
  CMD ["wget", "-q", "--spider", "http://127.0.0.1/"]

CMD ["httpd", "-f", "-p", "80", "-h", "/www", "-c", "/etc/httpd.conf", "-u", "nobody"]
