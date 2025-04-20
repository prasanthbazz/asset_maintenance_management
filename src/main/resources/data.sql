INSERT INTO asset_types (name, description) VALUES ('WHEELCHAIR', 'Mobility aid for patients');
INSERT INTO asset_types (name, description) VALUES ('COT', 'Infant bed for pediatric ward');
INSERT INTO asset_types (name, description) VALUES ('BED', 'Standard hospital bed');

INSERT INTO checklist_items (asset_type_id, task) VALUES
(1, 'Check wheel alignment'),
(1, 'Inspect brakes'),
(2, 'Check mattress condition'),
(3, 'Inspect frame stability');