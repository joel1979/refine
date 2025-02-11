import React, { useEffect, useState } from "react";
import { useSelect, useForm, useNavigation } from "@refinedev/core";
import { IPost } from "interfaces";

export const PostEdit: React.FC = () => {
    const { formLoading, onFinish, redirect, queryResult } = useForm<IPost>();

    const result = queryResult?.data?.data;

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    const [formValues, setFormValues] = useState({
        title: result?.title ?? "",
        content: result?.content,
        status: result?.status,
        category: {
            id: result?.category.id,
        },
    });

    useEffect(() => {
        setFormValues({
            title: result?.title ?? "",
            content: result?.content,
            status: result?.status,
            category: {
                id: result?.category.id,
            },
        });
    }, [result]);

    const { goBack } = useNavigation();

    const handleSubmit = async (redirectTo: "list" | "edit" | "create") => {
        await onFinish(formValues);

        redirect(redirectTo);
    };

    return (
        <div>
            <button className="back" onClick={() => goBack()}>
                Go Back
            </button>
            {result && (
                <form className="form-wrapper">
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            id="title"
                            required
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    title: e.target.value,
                                })
                            }
                            value={formValues.title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <select
                            id="status"
                            required
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    status: e.target.value as IPost["status"],
                                })
                            }
                            value={formValues.status}
                        >
                            <option value="published">published</option>
                            <option value="draft">draft</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                        <select
                            id="category"
                            required
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    category: {
                                        id: Number(e.target.value),
                                    },
                                })
                            }
                            value={formValues.category.id}
                        >
                            <option value={""} disabled>
                                Please select
                            </option>
                            {options?.map((category) => (
                                <option
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea
                            id="content"
                            required
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    content: e.target.value,
                                })
                            }
                            rows={10}
                            cols={50}
                            value={formValues.content}
                        />
                    </div>
                    <div className="saveActions">
                        <button
                            onClick={() => handleSubmit("list")}
                            type="button"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => handleSubmit("edit")}
                            type="button"
                        >
                            Save and continue editing
                        </button>
                        <button
                            onClick={() => handleSubmit("create")}
                            type="button"
                        >
                            Save and add another
                        </button>
                    </div>
                    {formLoading && <p>Loading</p>}
                </form>
            )}
        </div>
    );
};
