#### score_questionnaire.R -----------------------------------------------------
## Purpose: Take the JSON-encoded questionnaire response row(s) for one
##          participant, reverse-score specified items, and return a single
##          composite anxiety score.
##
## Inputs:
##   - responses: A character vector of JSON strings from the questionnaire
##                trials (e.g., questionnaire_df$response).
##   - reverse:   Integer indices of items to reverse-score (e.g., c(2, 5)).
## Output:
##   - A single numeric questionnaire score (e.g., anxiety_score).
##
## Scale: 1 to 5
## Reverse-scored items: 2, 5
##
## Example call:
##   anxiety_score <- score_questionnaire(
##     questionnaire_df$response,
##     reverse = c(2, 5)
##   )
##
## To test line-by-line, copy and paste this into your console:
## json_string <- questionnaire_df$response; reverse <- c(2, 5); scale_min <- 1L; scale_max <- 5L

score_questionnaire <- function(json_string, 
                                reverse = c(2, 5), # Bug 1. Fixed the default value of reverse item index from 12 to 2
                                scale_min = 1L, 
                                scale_max = 5L) {
  
  ## 1) If the JSON string is missing or empty, return a numeric NA
  if (is.null(json_string) || is.na(json_string) || !nzchar(json_string)) {
    warning("JSON string is missing or empty. Returning NA.")
    return(NA_real_)
  }
  
  ## 2) Parse the JSON string into an R object
  responses <- jsonlite::fromJSON(as.character(json_string))
  
  ## 3) Flatten and convert to numeric
  responses[sapply(responses, is.null)] <- NA
  # Bug 2. Fixed the typo response to responses
  responses <- unlist(responses)
  responses <- as.numeric(responses)
  
  ## 4) If reverse is provided, it must reference valid item positions
  if (length(reverse) > 0) {
    if (any(reverse < 1 | reverse > length(responses))) {
      stop("One or more 'reverse' item indices are out of range for this questionnaire response.")
    }
  }
  
  ## 5) Reverse-score the specified items
  if (length(reverse) > 0) {
    responses[reverse] <- (scale_max + scale_min) - responses[reverse]
  }
  
  ## 6) Compute and return the final score
  mean_score <- mean(responses, na.rm = TRUE)
  
  return(mean_score)
}
