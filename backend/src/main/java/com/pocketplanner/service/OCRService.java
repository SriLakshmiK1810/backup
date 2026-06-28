package com.pocketplanner.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.IOException;


@Service
public class OCRService {

    @Value("${ocr.space.api.key}")
    private String apiKey;

    public String extractText(MultipartFile file) throws IOException {
        System.out.println("File Name: " + file.getOriginalFilename());
System.out.println("Content Type: " + file.getContentType());
System.out.println("File Size: " + file.getSize());

    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.set("apikey", apiKey);
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

    body.add("file", new ByteArrayResource(file.getBytes()) {
        @Override
        public String getFilename() {
            return file.getOriginalFilename();
        }
    });

    body.add("language", "eng");

    HttpEntity<MultiValueMap<String, Object>> request =
            new HttpEntity<>(body, headers);

    ResponseEntity<String> response = restTemplate.postForEntity(
            "https://api.ocr.space/parse/image",
            request,
            String.class
    );

    System.out.println(response.getBody());

    ObjectMapper mapper = new ObjectMapper();
    JsonNode json = mapper.readTree(response.getBody());

    return json.path("ParsedResults")
            .path(0)
            .path("ParsedText")
            .asText("");
}
}