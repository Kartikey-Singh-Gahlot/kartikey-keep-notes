"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { SectionalLoader } from "./loader";
import "./styles/contactForm.css";
import { ContactFormProps } from "../interfaces/ContactFormInterfaces";

export default function ContactForm({ lightTheme }: ContactFormProps) {
    let [formData, setFormData] = useState({ sender: "", message: "" });
    let [loading, setLoading] = useState(false);

    function trgrFormChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    async function trgrFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loading) { return; }
        setLoading(true);
        try {
            const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const pr = await unp.json();
            if (pr.status) {
                toast.success("Email Sent", { duration: 1000 });
                return;
            }
            if (!pr.status) {
                toast.error(pr.body);
                return;
            }
        }
        catch (err) {
            toast.error("Server Error");
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        (!loading) ?
            (<form onSubmit={trgrFormSubmit} className="contact-form">
                <input required onChange={trgrFormChange} value={formData.sender} name="sender" className="sender-input" placeholder="xyz@gmail.com" />
                <textarea onChange={trgrFormChange} value={formData.message} name="message" className="message-input" placeholder="Your message for us" />
                <button type="submit" className="submit-button">Send</button>
            </form>) : (<SectionalLoader theme={(lightTheme) ? "lightTheme" : "darkTheme"} />)
    );
}
