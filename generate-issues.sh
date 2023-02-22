# Generates images of and solutions to all the problems contained in "hash_<num>.txt" files in a folder.
# Every "hash_<num>.txt" file must include one single problem.
# usage: sh ./gen.sh <foldername>
# example: sh ./gen.sh jr-easy
cd rush-master
pat='[0-9]+'
for file in ../$1/hash_*.txt
do	
    [[ $file =~ $pat ]]
    num=$BASH_REMATCH
    hash=`cat $file`
    echo $num $hash
	
	rm -f ../$1/solution_$num.txt
	touch ../$1/solution_$num.txt
	go run cmd/solve/main.go $hash > ../$1/solution_$num.txt

	#rm -f ../$1/image_$num.png
	#go run cmd/render/main.go $hash ../$1/image_$num.png
done
cd ..
node generate-issues-data $1