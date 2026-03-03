import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminLogin from './AdminLogin';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => {
            const { initial, animate, transition, ...validProps } = props;
            return <div {...validProps}>{children}</div>;
        },
    },
}));

describe('AdminLogin Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        sessionStorage.clear();
    });

    it('successfully logs in with valid credentials', async () => {
        const onLoginMock = vi.fn();
        render(<AdminLogin onLogin={onLoginMock} />);

        const usernameInput = screen.getByPlaceholderText('Enter username');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button', { name: /Sign In/i });

        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'rajhealingadmin' } });
        fireEvent.click(loginButton);

        expect(loginButton).toBeDisabled();

        await waitFor(() => {
            expect(sessionStorage.getItem('isAdmin')).toBe('true');
        });
        expect(onLoginMock).toHaveBeenCalledTimes(1);
    });

    it('shows error message with invalid credentials', async () => {
        const onLoginMock = vi.fn();
        render(<AdminLogin onLogin={onLoginMock} />);

        const usernameInput = screen.getByPlaceholderText('Enter username');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button', { name: /Sign In/i });

        fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
        });
        expect(sessionStorage.getItem('isAdmin')).toBeNull();
        expect(onLoginMock).not.toHaveBeenCalled();
        expect(loginButton).not.toBeDisabled();
    });
});
