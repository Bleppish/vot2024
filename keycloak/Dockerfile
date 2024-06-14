FROM quay.io/keycloak/keycloak:21.1.1  

# Set environment variables for Keycloak configuration
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Copy the realm configuration JSON to the container
COPY keycloak_realm.json /opt/keycloak/data/import/

# Expose the Keycloak port
EXPOSE 8080

# Start Keycloak and import the realm
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm"]
