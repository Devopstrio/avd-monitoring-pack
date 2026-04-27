# Devopstrio AVD Monitoring Pack
# Observability Infrastructure (Terraform)
# Target: Azure RM

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Monitoring Core Resource Group
resource "azurerm_resource_group" "monitor_rg" {
  name     = "rg-avd-monitoring-prd"
  location = "uksouth"
  tags = {
    Automation = "Monitoring-Pack"
    Component  = "Observability-Hub"
  }
}

# 2. Centralized Log Analytics Workspace (The Data Hub)
resource "azurerm_log_analytics_workspace" "law" {
  name                = "law-avd-global-prd"
  location            = azurerm_resource_group.monitor_rg.location
  resource_group_name = azurerm_resource_group.monitor_rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 90 # Extended retention for audit/compliance
}

# 3. Azure Monitor Workbooks (Native Visualization)
resource "azurerm_application_insights" "app_insights" {
  name                = "ai-monitoring-portal"
  location            = azurerm_resource_group.monitor_rg.location
  resource_group_name = azurerm_resource_group.monitor_rg.name
  workspace_id        = azurerm_log_analytics_workspace.law.id
  application_type    = "web"
}

# 4. Storage for Long-Term Telemetry Archival
resource "azurerm_storage_account" "archive_storage" {
  name                     = "stavdmonarchiveprd"
  resource_group_name      = azurerm_resource_group.monitor_rg.name
  location                 = azurerm_resource_group.monitor_rg.location
  account_tier             = "Standard"
  account_replication_type = "GRS" # Geo-redundant for critical telemetry
}

# 5. Azure Key Vault (Monitor & API Secrets)
resource "azurerm_key_vault" "monitor_vault" {
  name                = "kv-avd-monitor-secrets"
  location            = azurerm_resource_group.monitor_rg.location
  resource_group_name = azurerm_resource_group.monitor_rg.name
  tenant_id           = "your-tenant-id"
  sku_name            = "premium"

  access_policy {
    tenant_id = "your-tenant-id"
    object_id = "your-managed-identity-id"
    secret_permissions = ["Get", "List"]
  }
}

# Outputs
output "log_analytics_workspace_id" {
  value = azurerm_log_analytics_workspace.law.workspace_id
}

output "portal_insights_connection_string" {
  value     = azurerm_application_insights.app_insights.connection_string
  sensitive = true
}
