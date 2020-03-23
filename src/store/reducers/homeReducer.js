const initialState = {
    optionChecked: 'option1',
    firstChoice: true,
    files: [],
    fileChoiced: '',
    fileNew: '',
    alert: '',
    fileName: '',
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_OPTION':
            return { ...state, optionChecked: action.option };
        case 'CHANGE_FIRST_CHOICE':
            return { ...state, firstChoice: action.choice };
        case 'CHANGE_FILE':
            return {
                ...state,
                files: action.files,
                fileChoiced: action.fileChoiced,
                fileNew: action.fileNew,
            };
        case 'BACK':
            return {
                ...initialState
            };
        case 'ALERT':
            return { ...state, alert: action.alert };
        case 'CHANGE_FILE_NAME':
            return { ...state, fileName: action.fileName };
        default:
            return state
    }
}

export const actions = {
    setOptionChecked: (option) => (
        { type: 'CHANGE_OPTION', option: option }
    ),
    setFirstChoice: (choice) => (
        { type: 'CHANGE_FIRST_CHOICE', choice: choice }
    ),
    setFile: (files, fileChoiced, fileNew) => (
        {
            type: 'CHANGE_FILE',
            files: files,
            fileChoiced: fileChoiced,
            fileNew: fileNew
        }
    ),
    setFileName: (fileName) => (
        {
            type: 'CHANGE_FILE_NAME',
            fileName: fileName,
        }
    ),
    back: () => (
        { type: 'BACK' }
    ),
    alert: (alert) => (
        { type: 'ALERT', alert: alert }
    ),
}