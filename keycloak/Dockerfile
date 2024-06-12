FROM quay.io/keycloak/keycloak:latest

# Copy the realm configuration JSON to the container
COPY keycloak_realm.json /tmp/keycloak_realm.json

# Import the realm configuration during container build
RUN /opt/jboss/keycloak/bin/standalone.sh \
    -Dkeycloak.migration.action=import \
    -Dkeycloak.migration.provider=singleFile \
    -Dkeycloak.migration.file=/tmp/keycloak_realm.json \
    -Dkeycloak.migration.strategy=OVERWRITE_EXISTING

# Start Keycloak and expose necessary ports
CMD ["-b", "0.0.0.0", "-Dkeycloak.profile.feature.upload_scripts=enabled"]
