import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    title?: string;
    slogan?: string;
}

const AuthBrand: React.FC<Props> = ({ title, slogan }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full max-w-md mx-auto flex items-center justify-between sm:px-0 mb-6">
            <div className="flex items-center gap-3">
                {/* Logo (clickable) */}
                <button
                    type="button"
                    // onClick={() => navigate('/admin/portfolio')}
                    className="flex items-center gap-3 focus:outline-none"
                    aria-label="Go to dashboard"
                >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                        <img
                            src="/StockifyX.png"
                            alt="StockifyX logo"
                            className="w-full h-full object-cover"
                            draggable
                            onDragStart={(e) => {
                                const url = window.location.href;
                                try {
                                    e.dataTransfer.setData('text/uri-list', url);
                                } catch { }
                                e.dataTransfer.setData('text/plain', url);
                                e.dataTransfer.effectAllowed = 'copyLink';
                            }}
                        />
                    </div>
                </button>
                <div>
                    <div className="text-lg font-semibold text-foreground flex items-center gap-1">
                        StockifyX 
                        <span className="text-sm font-normal text-muted-foreground">
                            - {title}
                        </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{slogan || 'Nepse stock management — secure & reliable'}</div>
                </div>
            </div>
        </div>
    );
};

export default AuthBrand;
