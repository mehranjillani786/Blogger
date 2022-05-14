import { render } from "@testing-library/react";
import GeneralValidation from "../../../helper/GeneralValidation";
import Login from "../../../components/login/Login"
import Register from "../../../components/register/Register"
 import reducer from './UserSlice';
import { addContact, loginUser, registerUser } from './UserAction';
describe("Contact", () => {
    test("validate function should pass on correct input email", () => {
        const text = 'text@test.com';
        expect(GeneralValidation([["email", text]])).toBe(true)
    })
})
describe("Contact", () => {
    test("validate function should pass on incorrect input email", () => {
        const text = 'text';
        expect(GeneralValidation([["email", text]])).toBe(false)
    })
})


describe("Contact", () => {
    test("validate function should pass on correct input fullname", () => {
        const text = 'mehran jillani';
        expect(GeneralValidation([["full_name", text, 1, 50]])).toBe(true)
    })
})

describe("Contact", () => {
    test("validate function should pass on required input fullname", () => {
        const text = '';
        expect(GeneralValidation([["required", text]])).toBe(false)
    })
})



describe("Login", () => {
    test("validate function should pass on correct input email", () => {
        const text = 'text@test.com';
        expect(GeneralValidation([["email", text]])).toBe(true)
    })
})
describe("Login", () => {
    test("validate function should pass on incorrect input email", () => {
        const text = 'text';
        expect(GeneralValidation([["email", text]])).toBe(false)
    })
})

describe("Login", () => {
    test("validate function should pass on required password field", () => {
        const text = 'Admin@110';
        expect(GeneralValidation([["required", text]])).toBe(true)
    })
})

describe("Login", () => {
    test("validate function should pass on empty input password", () => {
        const text = '';
        expect(GeneralValidation([["required", text]])).toBe(false)
    })
})








describe('UserSlice', () => {
    describe('reducers', () => {
        const initialState = {
            user: null,
            token: '',
            isFetching: false,
            isSuccess: false,
            isError: false,
            isAuthenticated: false
        }

        it('sets fetching true when loginUser is pending', () => {
            const action = { type: loginUser.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                user: null,
                token: '',
                isFetching: true,
                isSuccess: false,
                isError: false,
                isAuthenticated: false
            });
        });

        it('sets the id and list when loginUser is fulfilled', () => {
            const action = { type: loginUser.fulfilled.type, payload: { email: "mehran.jillani@zigron.com", password: "admin@110" } };
            const state = reducer(initialState, action);
            expect(state).toEqual({ user: undefined, token: undefined, isFetching: false, isSuccess: true, isError: false, isAuthenticated: true });
        });

        it('sets fetching false when loginUser is rejected', () => {
            const action = { type: loginUser.rejected.type, payload: { error: 'some error' } };
            const state = reducer(initialState, action);
            expect(state).toEqual({ user: null, token: '', isFetching: false, isSuccess: false, isError: true, isAuthenticated: false });
        });
    });

});


describe('UserSlice', () => {
    describe('reducers', () => {
        const initialState = {
            user: null,
            token: '',
            isFetching: false,
            isSuccess: false,
            isError: false,
            isAuthenticated: false
        }

        it('sets fetching true when Register is pending', () => {
            const action = { type: registerUser.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                user: null,
                token: '',
                isFetching: true,
                isSuccess: false,
                isError: false,
                isAuthenticated: false
            });
        });

        it('sets the id and list when Register is fulfilled', () => {
            const action = { type: registerUser.fulfilled.type, payload: { name:"mehran",email: "mehran.jillani@zigron.com", password: "admin@110" } };
            const state = reducer(initialState, action); 
            expect(state).toEqual({ user: null, token: "", isFetching: false, isSuccess: true, isError: false, isAuthenticated: false });
        });

        it('sets fetching false when Register is rejected', () => {
            const action = { type: registerUser.rejected.type, payload: { error: 'some error' } };
            const state = reducer(initialState, action);
            expect(state).toEqual({ user: null, token: '', isFetching: false, isSuccess: false, isError: true, isAuthenticated: false });
        });
    });

});


describe('UserSlice', () => {
    describe('reducers', () => {
        const initialState = {
            user: null,
            token: '',
            isFetching: false,
            isSuccess: false,
            isError: false,
            isAuthenticated: false
        }

        it('sets fetching true when Contact us is pending', () => {
            const action = { type: addContact.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                user: null,
                token: '',
                isFetching: true,
                isSuccess: false,
                isError: false,
                isAuthenticated: false
            });
        });

        it('sets the id and list when Contact is fulfilled', () => {
            const action = { type: addContact.fulfilled.type, payload: { firstName:"mehran", lastName:"jillani" ,email: "mehran.jillani@zigron.com", message: "Hello!!" } };
            const state = reducer(initialState, action);  
            expect(state).toEqual({ user: null, token: "", isFetching: false, isSuccess: false, isError: false, isAuthenticated: false });
        });

        it('sets fetching false when Contact is rejected', () => {
            const action = { type: addContact.rejected.type, payload: { error: 'some error' } };
            const state = reducer(initialState, action);
            expect(state).toEqual({ user: null, token: '', isFetching: false, isSuccess: false, isError: false, isAuthenticated: false });
        });
    });

});