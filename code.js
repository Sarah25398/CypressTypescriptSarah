function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
        
    }
    console.log(arr.join(' ')+' '); 

}

function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i 
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j 
            }
        }
        if (minIndex != i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        }
    }
    console.log(arr.join(' ')+' ');
}