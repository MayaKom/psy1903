#### summarize_behavior.R -------------------------------------------------------
## Purpose: Take one participant’s IAT task trials and return a one-row summary
##          of behavioral performance
##
## Inputs:
##   - data: A data frame of only IAT task trials for one participant.
##   - rt_min, rt_max: Bounds for valid RTs (default 300–900 ms).
## Output:
##   - A one-row participant summary with five behavioral metrics.
##
## Example input:
##   summarize_behavior(task_df)

summarize_behavior <- function(data, rt_min = 300, rt_max = 900) {
  
  ## Check if rt column is numeric 
  if (!is.numeric(data$rt)) {
    data$rt <- as.numeric(data$rt)
  }
  
  ## Change correct column to logical
  ## Create robust version of as.logical()
  normalize_logical <- function(x) {
    if (is.logical(x)) return(x)
    if (is.numeric(x)) return(x == 1)
    if (is.character(x)) return(toupper(x) == "TRUE")
    as.logical(x)
  }
  data$correct <- normalize_logical(data$correct)
  #if (!is.logical(data$correct)) { 
  #  data$correct <- normalize_logical(data$correct)
  #} 
  # Refactor 1. Removed the above if condition because the function already checks if a variable is logical.
  
  ## Filter out trials where RT was outside of the threshold range
  # Refactor 2. changed the indexing based on column numbers with named columns
  # Refactor 3. changed hard-coded values to the variables specified in the function
  valid_data_rt <- data[data$rt >= rt_min & data$rt <= rt_max & data$correct == TRUE, ]
  valid_data_acc <- data[data$rt >= rt_min & data$rt <= rt_max, ]

  
  ## Center each participant’s reaction times:
  ## subtract the participant’s mean RT so centered RTs average to zero
  # valid_data_rt$rt_centered <- NA_real_

  # for (i in 1:nrow(valid_data_rt)) {
  #  valid_data_rt$rt_centered[i] <- valid_data_rt$rt[i] - mean(valid_data_rt$rt, na.rm = TRUE)
  # }

  
  # Refactor 4. replaced a for loop above with a vectorized operation below
  valid_data_rt$rt_centered <- valid_data_rt$rt - mean(valid_data_rt$rt, na.rm = TRUE)
 
  ## Prepare test trials by excluding practice trials
  ## Keep only trials where expectedCategory is:
  ## "school or anxiety" OR "nature or serenity" (congruent)
  ## "school or serenity" OR "nature or anxiety" (incongruent)
  test_data_rt <- valid_data_rt[grepl(" or ", valid_data_rt$expectedCategory), , drop = FALSE]
  test_data_acc <- valid_data_acc[grepl(" or ", valid_data_acc$expectedCategory), , drop = FALSE]
  
    
  ## Group trials by the category displayed
  desired_order <- c(
    "nature or serenity or school or anxiety",
    "nature or anxiety or school or serenity"
  )
  grp_rt <- factor(
    test_data_rt$expectedCategoryAsDisplayed,
    levels = desired_order
  )
  # Bug 1. fixed typo expectedCategoryDisplayed to expectedCategoryAsDisplayed
  grp_acc <- factor(
    test_data_acc$expectedCategoryAsDisplayed,
    levels = desired_order
  )
  
  ## Calculate mean rt
  means <- tapply(test_data_rt$rt, grp_rt, FUN = mean)
  
  ## If you see “arguments must have same length” from tapply(), check whether the grouping variable (grp) has the same number of rows as test_data$rt. Inspect grp and test_data side by side:
  ##   length(test_data$rt)
  ##   length(grp)
  ## A mismatched or misspelled column name in the factor() call will usually cause this.
  
  ## Calculate mean accuracy
  accuracy <- tapply(test_data_acc$correct, grp_acc, FUN = mean)
  
  ## Calculate D Score
  d_score  <- calculate_iat_dscore(test_data_rt)
  
  ## Create one-row summary data frame
  participant_summary <- data.frame(
    congruent_mean       = means[1],
    incongruent_mean     = means[2],
    congruent_accuracy   = accuracy[1],
    incongruent_accuracy = accuracy[2],
    d_score              = d_score, 
    stringsAsFactors     = FALSE,
    row.names            = NULL
  )
  
  ## Ensure Accuracy Values are between 0 and 1
  acc_cols <- c("congruent_accuracy", "incongruent_accuracy")
  for (col in acc_cols) {
    val <- participant_summary[[col]]
    if (!is.na(val) && (val < 0 || val > 1)) {
      warning(paste(col, "is outside [0, 1]. Check 'correct' coding."))
    }
  }
  ## Ensure Mean RTs within [rt_min, rt_max]
  rt_cols <- c("congruent_mean", "incongruent_mean")
  for (col in rt_cols) {
    val <- participant_summary[[col]]
    if (!is.na(val) && (val < rt_min || val > rt_max)) {
      warning(paste(col, "is outside range [", rt_min, ", ", rt_max, "]."))
    }
  }
  
  return(participant_summary)
}
