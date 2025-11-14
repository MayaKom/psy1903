process_participant <- function(file_name) {
    subject_id <- sub("\\.csv$", "", basename(file_name))
    df <- read.csv(here("data", "raw",file_name),
                   stringsAsFactors = FALSE)
    score <- score_questionnaire(
        json_string = df[df$trialType == "es_questionnaire", "response"]
    )
    df$rt <- compute_rt_if_missing_v(df)
    behavior <- summarize_behavior(df)
    
    df <- data.frame(
        subject_id = subject_id,
        score = score,
        mean_accuracy = behavior$mean_accuracy,
        mean_rt_correct = behavior$mean_rt_correct
        )
    
    write.csv(
        df,
        here::here("data", "cleaned", paste0(subject_id, "_processed.csv")),
        row.names = FALSE
    )
    return(df)
}
