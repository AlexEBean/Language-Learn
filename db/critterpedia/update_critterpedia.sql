CASE
    WHEN $2 = 'bug_arr' THEN 
            UPDATE critterpedia 
            SET bug_arr = $3 
            WHERE user_id = $1
    WHEN $2 = 'fish_arr' THEN
            UPDATE critterpedia 
            SET fish_arr = $3 
            WHERE user_id = $1
    WHEN $2 = 'sea_arr' THEN 
            UPDATE critterpedia 
            SET sea_arr = $3 
            WHERE user_id = $1
END;

SELECT * FROM critterpedia
WHERE user_id = $1;