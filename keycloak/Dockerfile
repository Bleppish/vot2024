FROM quay.io/keycloak/keycloak:latest

COPY keycloak_realm.json /tmp/keycloak_realm.json
RUN /opt/jboss/keycloak/bin/standalone.sh -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=/tmp/keycloak_realm.json -Dkeycloak.migration.strategy=OVERWRITE_EXISTING

CMD ["-b", "0.0.0.0", "-Dkeycloak.profile.feature.upload_scripts=enabled"]
