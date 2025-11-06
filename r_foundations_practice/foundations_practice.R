## Name: Maya Komakhidze
## Date: October 26, 2025
# Description: This is a script file for practicing foundations in R

age <- 19
name <- "Maya"
is_psych_major <- TRUE
favorite_numbers <- c(6,12, 36, 42)
typeof(age)
class(name)
class(is_psych_major)
typeof(favorite_numbers)

rt <- c(480, 530, 495, 610, 455, 390, 510, 565, 430, 500)
mean(rt)
sd(rt)
rt_adjusted <- rt+50
mean_diff <- mean(rt) - mean(rt_adjusted)
mean_diff
rt[5] <- NA
rt
mean(rt, na.rm=TRUE)

summary(rt)
str(rt)


subject_id <- c(1:10)
congruent <- c(TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE)
condition <- c("control", "control", "incongruent", "control", "incongruent", "control", "incongruent", "incongruent", "control", "incongruent")
experiment_data <- data.frame(subject_id, congruent, condition, rt)

head(experiment_data)
summary(experiment_data)
experiment_data[3,"rt"]
experiment_data["rt">500,"rt", drop=FALSE]

experiment_data[c(1:5), c("subject_id", "rt")]

experiment_data[4,]
experiment_data$condition
experiment_data[,"condition"]

fast_trials <- experiment_data[rt<500,]
incongruent_trials <- experiment_data[congruent==FALSE,]
fast_incongruent <- experiment_data[congruent==FALSE&rt<500,]
nrow(fast_trials)
nrow(incongruent_trials)
nrow(fast_incongruent)

sapply(experiment_data,typeof)
experiment_data$condition <- as.factor(experiment_data$condition)


mean(rt[congruent==TRUE])  
mean(rt[congruent==FALSE], na.rm=TRUE) 


mean(rt[condition=="control"])-mean(rt[condition=="incongruent"], na.rm=TRUE) 
congruency_effect <- mean(rt[condition=="incongruent"], na.rm=TRUE)-
  mean(rt[condition=="control"], na.rm=TRUE) 
print(paste("The congruency effect was", congruency_effect, 
            "milliseconds."))


experiment_data$rt_z <- (experiment_data$rt-mean(rt, na.rm=TRUE))/sd(rt, na.rm=TRUE)
head(experiment_data)

experiment_data$fast <- experiment_data$rt>500

new_subject <- c(subject_id = 11,congruent = TRUE,condition = "control",rt = 470,
                 rt_z = NA, fast = TRUE)
experiment_data <- rbind(experiment_data, new_subject)
tail(experiment_data)

experiment_data$rt_z<- NULL
names(experiment_data)

clean_experiment_data <- experiment_data[!is.na(rt) & rt>300 & rt<700,]
nrow(clean_experiment_data)
experiment_data$rt <- as.numeric(experiment_data$rt)
clean_experiment_data$rt <- as.numeric(clean_experiment_data$rt)
mean(experiment_data$rt, na.rm=TRUE) - mean(clean_experiment_data$rt)

