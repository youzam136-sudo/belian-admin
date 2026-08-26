import { useState } from "react";
import "../styles/dashboard.css";

type ChecklistItem = {
    label: string;
    done: boolean;
};

type ChecklistCard = {
    title: string;
    badge?: string;
    items: ChecklistItem[];
};

const checklistCards: ChecklistCard[] = [
    {
        title: "결제 방법 추가",
        badge: "PG 가입 무료",
        items: [
            { label: "상품 등록하기", done: true },
            { label: "법적 필수 정보 입력하기", done: false },
            { label: "약관·개인정보처리방침 확인", done: false },
            { label: "PG 신청하기", done: false },
        ],
    },
    {
        title: "기본설정",
        items: [
            { label: "사이트 정보 설정하기", done: false },
            { label: "관리자 계정 설정하기", done: true },
            { label: "약관 설정하기", done: false },
            { label: "도메인 연결하기", done: false },
        ],
    },
    {
        title: "판매하기",
        items: [
            { label: "상품 추가하기", done: false },
            { label: "배송 설정하기", done: false },
            { label: "결제 수단 연결하기", done: false },
        ],
    },
    {
        title: "성장하기",
        items: [
            { label: "검색엔진 등록하기",
