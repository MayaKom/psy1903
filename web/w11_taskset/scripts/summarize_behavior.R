summarize_behavior <- function(data, rt_min = 300, rt_max = 900) {
    
        ## Change correct column to logical
        if (!is.logical(data$correct)) { 
            data$correct <- as.logical(data$correct) 
        }
    mean_accuracy <- mean(data$correct, na.rm=TRUE)
    mean_rt_correct <- mean(data$rt[data$correct==TRUE & 
                                        data$rt<rt_max & data$rt>rt_min], na.rm=TRUE)
    participant_summary <- data.frame(
        mean_accuracy   = mean_accuracy,
        mean_rt_correct = mean_rt_correct)
    return(participant_summary)
}
