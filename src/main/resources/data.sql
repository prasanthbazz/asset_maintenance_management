INSERT INTO asset_types (name, description) VALUES ('WHEELCHAIR', 'Mobility aid for patients');
INSERT INTO asset_types (name, description) VALUES ('COT', 'Infant bed for pediatric ward');
INSERT INTO asset_types (name, description) VALUES ('BED', 'Standard hospital bed');

INSERT INTO checklist_items (asset_type_id, task) VALUES
(1, 'Check wheel alignment'),
(1, 'Inspect brakes'),
(2, 'Check mattress condition'),
(2, 'Check Paint'),
(3, 'Inspect frame stability');

-- Seed initial users (passwords are BCrypt-encoded for 'admin123' and 'tech123')
INSERT INTO users (username, password, role, enabled)
VALUES
    ('admin', '$2a$10$0u8CnnufohNXL9p3TFQXM.6vrcnfGKUh18Tvz73WCS/z2RISwgkZW', 'ADMIN', TRUE),
    ('tech1', '$2a$10$LjqszOaFH.vLf2Ny2c9cb.9IhxEBYCJes5LS3kmhXi5Sa6tuum5CO', 'TECHNICIAN', TRUE);