package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.DbModelObj;

import java.util.HashMap;
import java.util.List;

public class SqlMetadataHandler {

    private final HashMap<String, Object> metadata = new HashMap<String, Object>();
    private final HashMap<String, Object> body = new HashMap<String, Object>();

    private Object data;

    public SqlMetadataHandler(DbModelObj obj) {
        this.data = obj;

        if (this.data == null) {
            this.metadata.put("_records", 0);
        } else {
            this.metadata.put("_records", 1);
        }

        this.body.put("data", this.data);
        this.body.put("metadata", this.metadata);
    }

    public SqlMetadataHandler(List list) {
        this.data = list;
        this.metadata.put("_records", ((List<?>) list).size());

        this.body.put("data", this.data);
        this.body.put("metadata", this.metadata);
    }

    public HashMap<String, Object> getBody() {
        return body;
    }
}
