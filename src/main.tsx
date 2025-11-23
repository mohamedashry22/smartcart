import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "./app/providers/MantineProvider";
import { MotionProvider } from "./app/providers/MotionProvider";
import { QueryProvider } from "./app/providers/QueryProvider";
import { React19Provider } from "./app/providers/React19Provider";
import { CartProvider } from "./modules/cart/context";
import { router } from "./app/router";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";
import { AppErrorBoundary } from "./shared/components/AppErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React19Provider>
      <QueryProvider>
        <MantineProvider>
          <Notifications />
          <MotionProvider>
            <CartProvider>
              <AppErrorBoundary>
                <RouterProvider router={router} />
              </AppErrorBoundary>
            </CartProvider>
          </MotionProvider>
        </MantineProvider>
      </QueryProvider>
    </React19Provider>
  </React.StrictMode>
);
