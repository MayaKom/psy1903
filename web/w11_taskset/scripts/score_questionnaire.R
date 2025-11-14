score_questionnaire <- function(json_string, 
                                reverse = c(2,5,9), 
                                scale_min=0L, 
                                scale_max=4L){

    # If the JSON string is missing or empty, return a numeric NA
    if (is.null(json_string) ||
        length(json_string) == 0 ||
        is.na(json_string) ||
        !nzchar(json_string) ||
        !jsonlite::validate(json_string)) {
        return(NA_real_)
    }
    ## 1) Parse the JSON string into an R object
    responses <- jsonlite::fromJSON(json_string)
    ## 2) Flatten and convert to numeric
    responses <- as.numeric(unlist(responses))
    ## 3) Reverse-score the specified items
    if(length(reverse) > 0) {
        responses[reverse] <- scale_max + scale_min - responses[reverse]
    }
    return(sum(responses))
}
 

