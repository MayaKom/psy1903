process_participant <- function(file_name) {
    #### Load File and Extract ID ------------------------------------------------
    ## Derive a subject id from the filename (no extension)
    subject_id <- sub("\\.csv$", "", basename(file_name))
    
    ## Read the raw CSV
    participant_data <- read.csv(
        here::here("data", "raw", file_name),
        stringsAsFactors = FALSE
    )
    
    #### Questionnaire score -----------------------------------------------------
    ## Score questionnaire with our defaults (reverse 2,4,7 on 0–4 scale)
    tef10_score <- score_questionnaire(
        json_string = participant_data[participant_data$trialType == "questionnaire", "response"],
        reverse = c(2, 4, 7),
        scale_min = 0L,
        scale_max = 4L
    )
    
    
    #### Behavioral summary ------------------------------------------------------
    ## Filter and summarize behavioral data (250–900 ms)
    behavior <- summarize_behavior(participant_data, rt_min = 250, rt_max = 900)
    
    
    #### Save participant summary ------------------------------------------------
    ## Ensure output directory is created
    dir.create(
        here::here("data", "cleaned", "participants"),
        recursive = TRUE,
        showWarnings = FALSE
    )
    
    ## Combine into a single-row participant summary
    df_clean <- data.frame(
        subject_id = subject_id,
        tef10_score = tef10_score,
        behavior = behavior
    )
    
    
    ## Save summary CSV to cleaned/participants
    write.csv(
        df_clean,
        here::here("data", "cleaned", paste0(subject_id, "_processed.csv")),
        row.names = FALSE
    )
    
    #### Return output -----------------------------------------------------------
    stopifnot(nrow(df_clean) == 1)  # one row per participant
    return(df_clean)
}