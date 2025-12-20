-- Delete isViewed record for the chapter that has been updated
CREATE OR REPLACE FUNCTION delete_readchapter_after_update()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM "ReadChapter"
    WHERE "chapterID" = NEW."chapterID";

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_update_chapter
AFTER UPDATE ON "Chapters"
FOR EACH ROW
EXECUTE FUNCTION delete_readchapter_after_update();

-- Delete isViewed record for the link that has been updated
CREATE OR REPLACE FUNCTION delete_readnode_after_update()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM "ReadNode"
    WHERE "nodeID" = NEW."nodeID";

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_after_update_node
AFTER UPDATE ON "Nodes"
FOR EACH ROW
EXECUTE FUNCTION delete_readnode_after_update();