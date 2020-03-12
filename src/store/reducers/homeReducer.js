const initialState = {
    optionChecked: 'option1',
    firstChoice: true,
    files: [],
    fileChoiced: '',
    fileNew: '',
    alert: ''
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_OPTION':
            return {
                optionChecked: action.new,
                firstChoice: state.firstChoice,
                files: state.files,
                fileChoiced: state.fileChoiced,
                fileNew: state.fileNew,
                alert: state.alert
            };
        case 'CHANGE_FIRST_CHOICE':
            return {
                optionChecked: state.optionChecked,
                firstChoice: action.new,
                files: state.files,
                fileChoiced: state.fileChoiced,
                fileNew: state.fileNew,
                alert: state.alert
            };
        case 'CHANGE_FILE':
            return {
                optionChecked: state.optionChecked,
                firstChoice: state.firstChoice,
                files: action.files,
                fileChoiced: action.fileChoiced,
                fileNew: action.fileNew,
                alert: state.alert
            };
        case 'BACK':
            return {
                optionChecked: 'option1',
                firstChoice: true,
                files: [],
                fileChoiced: '',
                fileNew: '',
                alert: ''
            };
        case 'ALERT':
            return {
                optionChecked: state.optionChecked,
                firstChoice: state.firstChoice,
                files: state.files,
                fileChoiced: state.fileChoiced,
                fileNew: state.fileNew,
                alert: action.alert
            };
        default:
            return state
    }
}

export const actions = {
    setOptionChecked: (option) => (
        { type: 'CHANGE_OPTION', new: option }
    ),
    setFirstChoice: (choice) => (
        { type: 'CHANGE_FIRST_CHOICE', new: choice }
    ),
    setFile: (files, fileChoiced, fileNew) => (
        {
            type: 'CHANGE_FILE',
            files: files,
            fileChoiced: fileChoiced,
            fileNew: fileNew
        }
    ),
    back: () => (
        { type: 'BACK' }
    ),
    alert: (alert) => (
        { type: 'ALERT', alert: alert }
    ),
}