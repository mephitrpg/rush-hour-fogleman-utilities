# Generates images of and solutions to all the problems contained in "hash_<num>.txt" files in a folder.
# Every "hash_<num>.txt" file must include one single problem.
# usage: sh ./gen.sh <foldername>
# example: sh ./gen.sh jr-easy
go mod init example.com/m/v2
go get github.com/fogleman/rush
pat='[0-9]+'
rm -f $1/solution_*.txt
for filepath in $1/hash_*.txt
do	
	replace=''
    filename=$(basename "$filepath")
    [[ $filename =~ $pat ]]
    num=$BASH_REMATCH
    hash=`cat $filepath`
    echo $num $hash
	
	touch $1/solution_$num.txt
	go run cmd/solve/main.go $hash > $1/solution_$num.txt

	#rm -f $1/image_$num.png
	#go run cmd/render/main.go $hash $1/image_$num.png
done
node generate-issues-data $1