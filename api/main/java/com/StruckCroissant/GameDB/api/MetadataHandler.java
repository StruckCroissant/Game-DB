package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.DbModelObj;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class MetadataHandler {
    public HashMap<String, Object> addMetadata(Object obj){
        HashMap<String, Object> response = new HashMap<String,Object>();
        HashMap<String, Object> metadata = new HashMap<String,Object>();
        if(obj == null){
            return null;
        } else if(obj instanceof List){
            metadata.put("_records", ((List<?>) obj).size());

            response.put("data", obj);
            response.put("metadata", metadata);
        } else if(obj instanceof DbModelObj) {
            metadata.put("_records", 1);

            response.put("data", obj);
            response.put("metadata", metadata);
        }

        return response;
    }
}
