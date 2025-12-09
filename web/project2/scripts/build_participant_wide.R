#### build_participant_wide -----------------------------------------------------
## Purpose: Loop over all raw participant CSV files, process each one with
##          import_and_process(), and combine results into a single wide table.
##
## Inputs:
##   - None (function automatically scans data/raw for *.csv files)
## Output:
##   - A data frame with one row per participant and one column per summary
##     variable (RT means, accuracy, questionnaire score, D score, etc.).
##
## Example call:
##   participant_wide <- build_participant_wide()

build_participant_wide <- function() {
  files <- list.files(
    here::here("data", "raw"),
    pattern = "sub-.*\\.csv$",
    full.names = FALSE
  )
  # Bug 1. changed full.names to FALSE so that we don't store the entire file paths as names
  ## If you see an error "cannot open the connection", it usually means that R cannot find something where it's looking. Check your paths, files, and file_name. Remember where file_name comes from.
  
  if (length(files) == 0L) stop("No CSV files found in data/raw")
  
  rows <- list()
  for (i in seq_along(files)) {
    file_name <- files[i]
    rows[[i]] <- import_and_process(file_name)
  }

  out  <- do.call(rbind, rows)
  
  rownames(out) <- NULL
  
  return(out)
}
