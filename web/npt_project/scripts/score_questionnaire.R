
## Purpose: Take a JSON string from the questionnaire row and return a single score.
## Scale: jsPsychSurveyLikert default 0–4. Reverse items: 2, 4, 7.
score_questionnaire <- function(json_string, 
                                reverse = c(2,4,7), 
                                scale_min=0L, 
                                scale_max=4L) {
    # If the JSON string is missing or empty, return a numeric NA
    if (is.null(json_string) || is.na(json_string) || !nzchar(json_string)) {
        return(NA_real_)
    }
    
## 1) Parse the JSON string into an R object
##    Use jsonlite::fromJSON() to convert the text into a list.
## Example:
responses <- fromJSON(json_string)

## 2) Flatten and convert to numeric
##    Use unlist() to turn the list into a vector and coerce to numeric if needed.
## Example:
responses <- as.numeric(unlist(responses))

# If reverse is provided, it must reference valid item positions
if (length(reverse) > 0) {
    if (any(reverse < 1 | reverse > length(responses))) {
        stop("One or more 'reverse' item indices are out of range for this questionnaire response.")
    }
}
## 3) Reverse-score the specified items
if(length(reverse) > 0) {
    responses[reverse] <- scale_max + scale_min - responses[reverse]
}

## 5) Compute the final score
mean_score <- mean(responses, na.rm = TRUE)
return(mean_score)
}
