package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.DbModelObj;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

public class MetadataHandler {

    private HashMap<String, Object> metadata = new HashMap<String, Object>();
    private HashMap<String, Object> body = new HashMap<String, Object>();

    private Object data = null;

    public MetadataHandler(DbModelObj obj) {
        this.data = obj;

        if (this.data == null) {
            this.metadata.put("_records", 0);
        } else {
            this.metadata.put("_records", 1);
        }

        this.body.put("data", this.data);
        this.body.put("metadata", this.metadata);
    }

    public MetadataHandler(List list) {
        this.data = list;
        this.metadata.put("_records", ((List<?>) list).size());

        this.body.put("data", this.data);
        this.body.put("metadata", this.metadata);
    }

    public HashMap<String, Object> getBody() {
        return body;
    }
}
