#### calculate_iat_dscore.R -----------------------------------------------------
## Purpose: Compute the participant’s IAT D score from already-filtered
##          test-trial data (test_df), using:
##             D = (mean_incongruent - mean_congruent) / pooled_sd
##
## Inputs:
##   - test_df: A data frame containing only valid IAT test trials for one participant.
##          (This test_df is built inside summarize_behavior, so RTs and correctness
##           are already cleaned and filtered.)
## Output:
##   - A single numeric D score, or NA if insufficient data.
##
## Example input:
##   calculate_iat_dscore(test_df)

calculate_iat_dscore <- function(test_df) {
  
  ## Group trials by the category displayed
  desired_order <- c(
    "nature or serenity or school or anxiety", # congruent
    "nature or anxiety or school or serenity"  # incongruent
  )
  # Bug 1. fixed typo - nature or anxiety or school and serenity to or serenity
  # Possible refactor - desired order is already specified in summarize behavior
  grp <- factor(
    test_df$expectedCategoryAsDisplayed,
    levels = desired_order
  )
  
  ## Extract RTs for each condition
  cong_rt   <- test_df$rt[grp == desired_order[1]]
  incong_rt <- test_df$rt[grp == desired_order[2]]
  
  ## Drop NAs before counting / averaging
  cong_rt   <- cong_rt[!is.na(cong_rt)]
  incong_rt <- incong_rt[!is.na(incong_rt)]
  ## Require a minimum number of usable trials per condition
  
  ## Note: If you run this line-by-line in the console, `return()` will give
  ## “no function to return from” because you are not inside calculate_iat_dscore().
  ## That’s expected. Use browser() to step through inside the function, or run
  ## the function normally after checking earlier steps line-by-line.
  
  if (length(cong_rt) < 5L || length(incong_rt) < 5L) {
    warning("Not enough usable trials: inspect length(cong_rt) and length(incong_rt) to ensure both are ≥ 5.")
    return(NA_real_)
  }
  
  ## If either cong_rt or incong_rt are all NA or have length 0 inspect the 
  ## unique values in test_df$expectedCategoryAsDisplayed and compare them to in
  ## desired_order.
  ## Try:
  ##   unique(test_df$expectedCategoryAsDisplayed) == desired_order
  ## If there is a FALSE value, try:
  ##   unique(test_df$expectedCategoryAsDisplayed)
  ##   desired_order
  
  
  ## Pooled SD across all valid RTs in test_df
  pooled_sd <- sd(test_df$rt, na.rm = TRUE)
  
  ## Note: same as above, may get an error trying to use return() line-by-line
  if (is.na(pooled_sd) || pooled_sd == 0) {
    return(NA_real_)
  }
  
  ## D = (mean incongruent - mean congruent) / pooled SD
  d_score <- (mean(incong_rt, na.rm = TRUE) - mean(cong_rt, na.rm = TRUE)) / pooled_sd
  
  ## Note: same as above, may get an error trying to use return() line-by-line
  ## Instead, you can check your d_score value by typing:
  #      d_score
  return(d_score)
  
  
}
