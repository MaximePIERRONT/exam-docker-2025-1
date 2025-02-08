FROM redis:6.2

LABEL maintainer="votre.email@example.com" \
      version="1.0" \
      type="database"

ENV REDIS_MAX_MEMORY=2gb

# Configuration du volume pour la persistance
VOLUME /data

EXPOSE 6380

# Ajout de la configuration pour la persistance
CMD redis-server --port 6380 \
    --maxmemory ${REDIS_MAX_MEMORY} \
    --dir /data \
    --save 10 1 \
    --appendonly yes \
    --appendfilename "appendonly.aof"