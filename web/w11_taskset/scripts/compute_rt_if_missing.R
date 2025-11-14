#compute_rt_if_missing_l <- function(data) {
#    for (i in 1:nrow(data)) {
#if(is.na(data$rt[i]) & 
#   !is.na(data$stim_onset_ms[i]) & 
#   !is.na(data$resp_time_ms[i]) & 
#   !is.na(data$response[i])){
#    data$rt[i] <- data$resp_time_ms[i] - data$stim_onset_ms[i] 
#} else if (is.na(data$response[i])) {
#    data$rt[i] <- NA
#}
#    }
#}

compute_rt_if_missing_v <- function(data){
    miss_rt <- is.na(data$rt)
    stim_resp_values <- !is.na(data$stim_onset_ms) &
        !is.na(data$resp_time_ms) &
        !is.na(data$response)
    data$rt[miss_rt & stim_resp_values] <- 
        data$resp_time_ms[miss_rt & stim_resp_values] - 
        data$stim_onset_ms[miss_rt & stim_resp_values]
    return(data$rt)
}

