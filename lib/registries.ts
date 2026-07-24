// lib/registries.ts
// Registries for the 120 engine cards, 50 UI modules, and 12 map cards.
// Build Rule 3: each card type is kept as a separate registry.

import type { CardDescriptor } from "./types";

// ---------------------------------------------------------------------------
// ENGINE CARD REGISTRY — 120 entries
// ---------------------------------------------------------------------------
export const ENGINE_CARD_REGISTRY: CardDescriptor[] = [
  // Route Intelligence (EC-001–EC-020)
  { id: "EC-001", name: "RouteCapacityEngine",        version: "1.0.0", description: "Computes current route capacity from verified Zebra records.",        releaseState: "live"  },
  { id: "EC-002", name: "RouteAvailabilityEngine",    version: "1.0.0", description: "Determines slot availability on active routes.",                      releaseState: "live"  },
  { id: "EC-003", name: "RouteUtilizationEngine",     version: "1.0.0", description: "Calculates utilization ratio from confirmed load data.",               releaseState: "live"  },
  { id: "EC-004", name: "RouteTimeEngine",            version: "1.0.0", description: "Derives transit time from verified GPS and schedule records.",         releaseState: "live"  },
  { id: "EC-005", name: "RouteCoordinatesEngine",     version: "1.0.0", description: "Resolves verified waypoint coordinates from CIS.",                     releaseState: "live"  },
  { id: "EC-006", name: "RouteConflictEngine",        version: "1.0.0", description: "Detects scheduling conflicts on a route segment.",                     releaseState: "live"  },
  { id: "EC-007", name: "RouteDelayEngine",           version: "1.0.0", description: "Estimates delay probability from historical patterns.",                releaseState: "review"},
  { id: "EC-008", name: "RouteHazardEngine",          version: "1.0.0", description: "Flags verified hazard events on a route.",                             releaseState: "live"  },
  { id: "EC-009", name: "RouteWeatherEngine",         version: "1.0.0", description: "Integrates verified weather signals into route assessment.",           releaseState: "review"},
  { id: "EC-010", name: "RouteFuelEngine",            version: "1.0.0", description: "Computes fuel cost from verified mileage and rate data.",              releaseState: "live"  },
  { id: "EC-011", name: "RouteLoadEngine",            version: "1.0.0", description: "Calculates load weight from confirmed manifest records.",              releaseState: "live"  },
  { id: "EC-012", name: "RouteComplianceEngine",      version: "1.0.0", description: "Validates route against regulatory compliance records.",               releaseState: "live"  },
  { id: "EC-013", name: "RouteTemperatureEngine",     version: "1.0.0", description: "Monitors temperature zone compliance on cold-chain routes.",           releaseState: "live"  },
  { id: "EC-014", name: "RouteCostEngine",            version: "1.0.0", description: "Aggregates verified cost components for a route.",                     releaseState: "live"  },
  { id: "EC-015", name: "RouteRiskScoreEngine",       version: "1.0.0", description: "Computes composite risk score from verified evidence.",                releaseState: "review"},
  { id: "EC-016", name: "RouteAlternativeEngine",     version: "1.0.0", description: "Identifies verified alternative route options.",                       releaseState: "draft" },
  { id: "EC-017", name: "RouteHandoffEngine",         version: "1.0.0", description: "Validates cross-carrier handoff points.",                              releaseState: "live"  },
  { id: "EC-018", name: "RouteSegmentEngine",         version: "1.0.0", description: "Splits route into discrete measurable segments.",                      releaseState: "live"  },
  { id: "EC-019", name: "RoutePriorityEngine",        version: "1.0.0", description: "Ranks route priority from verified business rules.",                   releaseState: "live"  },
  { id: "EC-020", name: "RouteAuditEngine",           version: "1.0.0", description: "Logs all route decisions with full lineage.",                          releaseState: "live"  },

  // Vehicle Intelligence (EC-021–EC-040)
  { id: "EC-021", name: "VehicleCapacityEngine",      version: "1.0.0", description: "Reads verified vehicle capacity from fleet records.",                  releaseState: "live"  },
  { id: "EC-022", name: "VehicleAvailabilityEngine",  version: "1.0.0", description: "Checks real-time vehicle availability from dispatch system.",          releaseState: "live"  },
  { id: "EC-023", name: "VehicleUtilizationEngine",   version: "1.0.0", description: "Computes utilization from confirmed trip records.",                    releaseState: "live"  },
  { id: "EC-024", name: "VehicleLocationEngine",      version: "1.0.0", description: "Resolves current vehicle position from verified GPS feed.",            releaseState: "live"  },
  { id: "EC-025", name: "VehicleStatusEngine",        version: "1.0.0", description: "Determines operational status from telematics data.",                  releaseState: "live"  },
  { id: "EC-026", name: "VehicleMaintenanceEngine",   version: "1.0.0", description: "Flags due maintenance from verified service records.",                 releaseState: "live"  },
  { id: "EC-027", name: "VehicleFuelLevelEngine",     version: "1.0.0", description: "Reads verified fuel level from telematics.",                           releaseState: "live"  },
  { id: "EC-028", name: "VehicleDriverEngine",        version: "1.0.0", description: "Links verified driver assignment to vehicle.",                         releaseState: "live"  },
  { id: "EC-029", name: "VehicleComplianceEngine",    version: "1.0.0", description: "Validates vehicle certification and compliance documents.",             releaseState: "live"  },
  { id: "EC-030", name: "VehicleLoadMatchEngine",     version: "1.0.0", description: "Matches load specs to vehicle capabilities.",                          releaseState: "live"  },
  { id: "EC-031", name: "VehicleHistoryEngine",       version: "1.0.0", description: "Retrieves verified trip history for a vehicle.",                       releaseState: "live"  },
  { id: "EC-032", name: "VehicleIdleEngine",          version: "1.0.0", description: "Calculates idle time from confirmed telematics.",                      releaseState: "live"  },
  { id: "EC-033", name: "VehicleBreakdownEngine",     version: "1.0.0", description: "Predicts breakdown risk from verified maintenance data.",               releaseState: "review"},
  { id: "EC-034", name: "VehicleWeightEngine",        version: "1.0.0", description: "Computes gross vehicle weight from confirmed load.",                    releaseState: "live"  },
  { id: "EC-035", name: "VehicleSpeedEngine",         version: "1.0.0", description: "Monitors speed compliance from GPS records.",                          releaseState: "live"  },
  { id: "EC-036", name: "VehicleTemperatureEngine",   version: "1.0.0", description: "Monitors cargo temperature sensor data.",                              releaseState: "live"  },
  { id: "EC-037", name: "VehicleIncidentEngine",      version: "1.0.0", description: "Logs verified incident records for a vehicle.",                        releaseState: "live"  },
  { id: "EC-038", name: "VehicleInsuranceEngine",     version: "1.0.0", description: "Validates vehicle insurance coverage.",                                releaseState: "live"  },
  { id: "EC-039", name: "VehicleReturnEngine",        version: "1.0.0", description: "Tracks empty return leg from confirmed delivery.",                     releaseState: "live"  },
  { id: "EC-040", name: "VehicleAuditEngine",         version: "1.0.0", description: "Logs all vehicle assessments with lineage.",                           releaseState: "live"  },

  // Warehouse Intelligence (EC-041–EC-060)
  { id: "EC-041", name: "WarehouseCapacityEngine",    version: "1.0.0", description: "Reads verified warehouse capacity from WMS records.",                  releaseState: "live"  },
  { id: "EC-042", name: "WarehouseAvailabilityEngine",version: "1.0.0", description: "Checks dock and bay availability from scheduling system.",             releaseState: "live"  },
  { id: "EC-043", name: "WarehouseUtilizationEngine", version: "1.0.0", description: "Computes floor utilization from confirmed inventory records.",         releaseState: "live"  },
  { id: "EC-044", name: "WarehouseInventoryEngine",   version: "1.0.0", description: "Reads verified stock-on-hand from WMS.",                               releaseState: "live"  },
  { id: "EC-045", name: "WarehouseDwellEngine",       version: "1.0.0", description: "Measures cargo dwell time from verified check-in/out records.",        releaseState: "live"  },
  { id: "EC-046", name: "WarehouseThroughputEngine",  version: "1.0.0", description: "Computes throughput from verified inbound/outbound counts.",           releaseState: "live"  },
  { id: "EC-047", name: "WarehouseTemperatureEngine", version: "1.0.0", description: "Monitors verified temperature zone data in storage areas.",            releaseState: "live"  },
  { id: "EC-048", name: "WarehouseHazmatEngine",      version: "1.0.0", description: "Flags hazardous material storage compliance.",                         releaseState: "live"  },
  { id: "EC-049", name: "WarehouseStaffingEngine",    version: "1.0.0", description: "Reads verified staffing levels from HR records.",                      releaseState: "live"  },
  { id: "EC-050", name: "WarehouseEquipmentEngine",   version: "1.0.0", description: "Checks equipment availability from maintenance records.",              releaseState: "live"  },
  { id: "EC-051", name: "WarehouseSecurityEngine",    version: "1.0.0", description: "Validates access control and security log records.",                   releaseState: "live"  },
  { id: "EC-052", name: "WarehousePickEngine",        version: "1.0.0", description: "Reads verified pick-accuracy metrics.",                                releaseState: "live"  },
  { id: "EC-053", name: "WarehouseReceivingEngine",   version: "1.0.0", description: "Processes verified goods-received notes.",                             releaseState: "live"  },
  { id: "EC-054", name: "WarehouseShippingEngine",    version: "1.0.0", description: "Processes verified dispatch confirmation records.",                     releaseState: "live"  },
  { id: "EC-055", name: "WarehouseReturnEngine",      version: "1.0.0", description: "Handles verified returns and restocking records.",                     releaseState: "live"  },
  { id: "EC-056", name: "WarehouseCostEngine",        version: "1.0.0", description: "Aggregates verified warehousing cost components.",                     releaseState: "live"  },
  { id: "EC-057", name: "WarehouseComplianceEngine",  version: "1.0.0", description: "Validates storage against regulatory requirements.",                   releaseState: "live"  },
  { id: "EC-058", name: "WarehouseAlertEngine",       version: "1.0.0", description: "Generates alerts from verified threshold breaches.",                   releaseState: "live"  },
  { id: "EC-059", name: "WarehouseForecastEngine",    version: "1.0.0", description: "Projects capacity needs from verified demand signals.",                releaseState: "review"},
  { id: "EC-060", name: "WarehouseAuditEngine",       version: "1.0.0", description: "Logs all warehouse assessments with lineage.",                         releaseState: "live"  },

  // Carrier Intelligence (EC-061–EC-080)
  { id: "EC-061", name: "CarrierCapacityEngine",      version: "1.0.0", description: "Reads verified carrier capacity from contract records.",               releaseState: "live"  },
  { id: "EC-062", name: "CarrierAvailabilityEngine",  version: "1.0.0", description: "Checks carrier lane availability from booking system.",               releaseState: "live"  },
  { id: "EC-063", name: "CarrierUtilizationEngine",   version: "1.0.0", description: "Computes carrier utilization from confirmed bookings.",                releaseState: "live"  },
  { id: "EC-064", name: "CarrierPerformanceEngine",   version: "1.0.0", description: "Scores carrier on-time performance from verified delivery records.",  releaseState: "live"  },
  { id: "EC-065", name: "CarrierRateEngine",          version: "1.0.0", description: "Reads verified contract rate cards.",                                  releaseState: "live"  },
  { id: "EC-066", name: "CarrierComplianceEngine",    version: "1.0.0", description: "Validates carrier certifications and compliance documents.",           releaseState: "live"  },
  { id: "EC-067", name: "CarrierIncidentEngine",      version: "1.0.0", description: "Reads verified carrier incident history.",                             releaseState: "live"  },
  { id: "EC-068", name: "CarrierTrackingEngine",      version: "1.0.0", description: "Integrates verified carrier tracking events.",                         releaseState: "live"  },
  { id: "EC-069", name: "CarrierSLAEngine",           version: "1.0.0", description: "Monitors SLA compliance from verified delivery data.",                 releaseState: "live"  },
  { id: "EC-070", name: "CarrierRankEngine",          version: "1.0.0", description: "Ranks carriers by verified performance scores.",                       releaseState: "review"},
  { id: "EC-071", name: "CarrierContractEngine",      version: "1.0.0", description: "Validates active contract terms.",                                     releaseState: "live"  },
  { id: "EC-072", name: "CarrierClaimEngine",         version: "1.0.0", description: "Processes verified damage and loss claims.",                           releaseState: "live"  },
  { id: "EC-073", name: "CarrierInvoiceEngine",       version: "1.0.0", description: "Reconciles verified carrier invoices.",                                releaseState: "live"  },
  { id: "EC-074", name: "CarrierCapabilityEngine",    version: "1.0.0", description: "Matches load requirements to carrier capabilities.",                   releaseState: "live"  },
  { id: "EC-075", name: "CarrierGeoEngine",           version: "1.0.0", description: "Maps verified carrier service zones.",                                 releaseState: "live"  },
  { id: "EC-076", name: "CarrierCommunicationEngine", version: "1.0.0", description: "Logs verified carrier communication events.",                          releaseState: "live"  },
  { id: "EC-077", name: "CarrierRiskEngine",          version: "1.0.0", description: "Assesses carrier risk from verified evidence.",                        releaseState: "review"},
  { id: "EC-078", name: "CarrierPreferenceEngine",    version: "1.0.0", description: "Applies verified shipper preference rules.",                           releaseState: "live"  },
  { id: "EC-079", name: "CarrierSubcontractEngine",   version: "1.0.0", description: "Validates subcontractor chain compliance.",                            releaseState: "draft" },
  { id: "EC-080", name: "CarrierAuditEngine",         version: "1.0.0", description: "Logs all carrier assessments with lineage.",                           releaseState: "live"  },

  // Demand & Order Intelligence (EC-081–EC-100)
  { id: "EC-081", name: "OrderIntakeEngine",          version: "1.0.0", description: "Ingests verified order records from OMS.",                             releaseState: "live"  },
  { id: "EC-082", name: "OrderPriorityEngine",        version: "1.0.0", description: "Assigns priority from verified SLA and customer records.",             releaseState: "live"  },
  { id: "EC-083", name: "OrderBatchEngine",           version: "1.0.0", description: "Groups orders for efficient batching from confirmed data.",            releaseState: "live"  },
  { id: "EC-084", name: "OrderSplitEngine",           version: "1.0.0", description: "Splits orders across routes based on verified capacity.",              releaseState: "live"  },
  { id: "EC-085", name: "OrderExceptionEngine",       version: "1.0.0", description: "Flags order exceptions from verified status records.",                 releaseState: "live"  },
  { id: "EC-086", name: "DemandForecastEngine",       version: "1.0.0", description: "Projects demand from verified historical signals.",                    releaseState: "review"},
  { id: "EC-087", name: "DemandSeasonalityEngine",    version: "1.0.0", description: "Applies seasonality adjustments from verified patterns.",              releaseState: "review"},
  { id: "EC-088", name: "DemandVolatilityEngine",     version: "1.0.0", description: "Measures demand volatility from verified order history.",              releaseState: "review"},
  { id: "EC-089", name: "DemandCoverageEngine",       version: "1.0.0", description: "Computes demand coverage from verified inventory.",                    releaseState: "live"  },
  { id: "EC-090", name: "DemandAlertEngine",          version: "1.0.0", description: "Generates demand alerts from verified threshold triggers.",            releaseState: "live"  },
  { id: "EC-091", name: "OrderCostEngine",            version: "1.0.0", description: "Aggregates verified order fulfilment costs.",                          releaseState: "live"  },
  { id: "EC-092", name: "OrderComplianceEngine",      version: "1.0.0", description: "Validates order against trade compliance rules.",                      releaseState: "live"  },
  { id: "EC-093", name: "OrderCancellationEngine",    version: "1.0.0", description: "Processes verified cancellation records.",                             releaseState: "live"  },
  { id: "EC-094", name: "OrderDeliveryEngine",        version: "1.0.0", description: "Confirms delivery from verified POD records.",                         releaseState: "live"  },
  { id: "EC-095", name: "OrderReturnEngine",          version: "1.0.0", description: "Handles verified return authorisation records.",                       releaseState: "live"  },
  { id: "EC-096", name: "OrderTraceEngine",           version: "1.0.0", description: "Traces order end-to-end from verified events.",                        releaseState: "live"  },
  { id: "EC-097", name: "OrderEscalationEngine",      version: "1.0.0", description: "Escalates orders based on verified SLA breaches.",                    releaseState: "live"  },
  { id: "EC-098", name: "OrderDocumentEngine",        version: "1.0.0", description: "Validates required order documents.",                                  releaseState: "live"  },
  { id: "EC-099", name: "OrderCustomsEngine",         version: "1.0.0", description: "Checks customs clearance status from verified documents.",             releaseState: "live"  },
  { id: "EC-100", name: "OrderAuditEngine",           version: "1.0.0", description: "Logs all order assessments with lineage.",                             releaseState: "live"  },

  // Network & System Intelligence (EC-101–EC-120)
  { id: "EC-101", name: "NetworkCongestionEngine",    version: "1.0.0", description: "Reads verified traffic and congestion data.",                          releaseState: "live"  },
  { id: "EC-102", name: "NetworkCapacityEngine",      version: "1.0.0", description: "Assesses network-level capacity from verified route records.",         releaseState: "live"  },
  { id: "EC-103", name: "NetworkOptimisationEngine",  version: "1.0.0", description: "Suggests network improvements from verified performance data.",        releaseState: "review"},
  { id: "EC-104", name: "NetworkResilienceEngine",    version: "1.0.0", description: "Evaluates network resilience from verified disruption data.",          releaseState: "review"},
  { id: "EC-105", name: "NetworkCostEngine",          version: "1.0.0", description: "Computes network-level costs from verified records.",                  releaseState: "live"  },
  { id: "EC-106", name: "NetworkEventEngine",         version: "1.0.0", description: "Ingests verified network event signals.",                              releaseState: "live"  },
  { id: "EC-107", name: "NetworkAlertEngine",         version: "1.0.0", description: "Generates network-level alerts from verified thresholds.",             releaseState: "live"  },
  { id: "EC-108", name: "NetworkHubEngine",           version: "1.0.0", description: "Monitors hub performance from verified throughput records.",           releaseState: "live"  },
  { id: "EC-109", name: "NetworkLineEngine",          version: "1.0.0", description: "Assesses line-haul performance from verified data.",                   releaseState: "live"  },
  { id: "EC-110", name: "NetworkLastMileEngine",      version: "1.0.0", description: "Evaluates last-mile delivery from verified records.",                  releaseState: "live"  },
  { id: "EC-111", name: "SystemHealthEngine",         version: "1.0.0", description: "Monitors integration system health from verified signals.",            releaseState: "live"  },
  { id: "EC-112", name: "SystemLatencyEngine",        version: "1.0.0", description: "Measures verified data feed latency.",                                 releaseState: "live"  },
  { id: "EC-113", name: "SystemFreshnessEngine",      version: "1.0.0", description: "Tracks data freshness across all integrated sources.",                 releaseState: "live"  },
  { id: "EC-114", name: "SystemDataQualityEngine",    version: "1.0.0", description: "Scores data quality from verified completeness metrics.",              releaseState: "live"  },
  { id: "EC-115", name: "SystemMissingInputEngine",   version: "1.0.0", description: "Identifies and reports all missing required inputs.",                  releaseState: "live"  },
  { id: "EC-116", name: "SystemConfidenceEngine",     version: "1.0.0", description: "Aggregates confidence scores across all active engines.",              releaseState: "live"  },
  { id: "EC-117", name: "SystemLineageEngine",        version: "1.0.0", description: "Builds end-to-end lineage graph for all active records.",              releaseState: "live"  },
  { id: "EC-118", name: "SystemReleaseStateEngine",   version: "1.0.0", description: "Propagates release-state flags through all layers.",                  releaseState: "live"  },
  { id: "EC-119", name: "SystemAnomalyEngine",        version: "1.0.0", description: "Detects anomalies from verified baseline patterns.",                   releaseState: "review"},
  { id: "EC-120", name: "SystemAuditEngine",          version: "1.0.0", description: "Master audit log for all engine card outputs with full lineage.",      releaseState: "live"  },
];

// ---------------------------------------------------------------------------
// UI MODULE REGISTRY — 50 entries
// ---------------------------------------------------------------------------
export const UI_MODULE_REGISTRY: CardDescriptor[] = [
  { id: "UI-001", name: "RouteCapacityModule",       version: "1.0.0", description: "Displays route capacity status.",                   releaseState: "live"   },
  { id: "UI-002", name: "RouteAvailabilityModule",   version: "1.0.0", description: "Shows route slot availability.",                    releaseState: "live"   },
  { id: "UI-003", name: "RouteUtilizationModule",    version: "1.0.0", description: "Visualises route utilization percentage.",           releaseState: "live"   },
  { id: "UI-004", name: "RouteTimelineModule",       version: "1.0.0", description: "Timeline view for route events.",                   releaseState: "live"   },
  { id: "UI-005", name: "RouteMapModule",            version: "1.0.0", description: "Renders route coordinates on map canvas.",           releaseState: "live"   },
  { id: "UI-006", name: "RouteAlertModule",          version: "1.0.0", description: "Displays active route alerts.",                     releaseState: "live"   },
  { id: "UI-007", name: "RouteCostModule",           version: "1.0.0", description: "Shows route cost breakdown.",                       releaseState: "live"   },
  { id: "UI-008", name: "RouteComplianceModule",     version: "1.0.0", description: "Compliance status panel for routes.",               releaseState: "live"   },
  { id: "UI-009", name: "RouteRiskModule",           version: "1.0.0", description: "Risk indicator panel for routes.",                  releaseState: "review" },
  { id: "UI-010", name: "RouteAuditModule",          version: "1.0.0", description: "Audit trail panel for route decisions.",            releaseState: "live"   },
  { id: "UI-011", name: "VehicleStatusModule",       version: "1.0.0", description: "Vehicle operational status display.",               releaseState: "live"   },
  { id: "UI-012", name: "VehicleLocationModule",     version: "1.0.0", description: "Real-time vehicle location panel.",                 releaseState: "live"   },
  { id: "UI-013", name: "VehicleCapacityModule",     version: "1.0.0", description: "Vehicle load capacity indicator.",                  releaseState: "live"   },
  { id: "UI-014", name: "VehicleMaintenanceModule",  version: "1.0.0", description: "Maintenance due alert panel.",                      releaseState: "live"   },
  { id: "UI-015", name: "VehicleComplianceModule",   version: "1.0.0", description: "Vehicle certification compliance view.",            releaseState: "live"   },
  { id: "UI-016", name: "VehicleDriverModule",       version: "1.0.0", description: "Driver assignment panel.",                         releaseState: "live"   },
  { id: "UI-017", name: "VehicleFuelModule",         version: "1.0.0", description: "Fuel level and consumption view.",                  releaseState: "live"   },
  { id: "UI-018", name: "VehicleIncidentModule",     version: "1.0.0", description: "Incident history panel for vehicle.",               releaseState: "live"   },
  { id: "UI-019", name: "VehicleHistoryModule",      version: "1.0.0", description: "Trip history panel for vehicle.",                   releaseState: "live"   },
  { id: "UI-020", name: "VehicleAuditModule",        version: "1.0.0", description: "Audit trail panel for vehicle assessments.",        releaseState: "live"   },
  { id: "UI-021", name: "WarehouseCapacityModule",   version: "1.0.0", description: "Warehouse storage capacity view.",                  releaseState: "live"   },
  { id: "UI-022", name: "WarehouseInventoryModule",  version: "1.0.0", description: "Live inventory level display.",                     releaseState: "live"   },
  { id: "UI-023", name: "WarehouseThroughputModule", version: "1.0.0", description: "Throughput metrics panel.",                        releaseState: "live"   },
  { id: "UI-024", name: "WarehouseDockModule",       version: "1.0.0", description: "Dock availability schedule view.",                  releaseState: "live"   },
  { id: "UI-025", name: "WarehouseAlertModule",      version: "1.0.0", description: "Warehouse alert notification panel.",               releaseState: "live"   },
  { id: "UI-026", name: "WarehouseCostModule",       version: "1.0.0", description: "Warehousing cost breakdown panel.",                 releaseState: "live"   },
  { id: "UI-027", name: "WarehouseComplianceModule", version: "1.0.0", description: "Regulatory compliance status panel.",               releaseState: "live"   },
  { id: "UI-028", name: "WarehouseStaffModule",      version: "1.0.0", description: "Staffing level indicator.",                        releaseState: "live"   },
  { id: "UI-029", name: "WarehouseForecastModule",   version: "1.0.0", description: "Demand forecast display panel.",                    releaseState: "review" },
  { id: "UI-030", name: "WarehouseAuditModule",      version: "1.0.0", description: "Audit trail panel for warehouse records.",          releaseState: "live"   },
  { id: "UI-031", name: "CarrierPerformanceModule",  version: "1.0.0", description: "Carrier on-time performance dashboard.",            releaseState: "live"   },
  { id: "UI-032", name: "CarrierAvailabilityModule", version: "1.0.0", description: "Carrier lane availability view.",                   releaseState: "live"   },
  { id: "UI-033", name: "CarrierRateModule",         version: "1.0.0", description: "Contract rate card display.",                       releaseState: "live"   },
  { id: "UI-034", name: "CarrierComplianceModule",   version: "1.0.0", description: "Carrier compliance certificate panel.",             releaseState: "live"   },
  { id: "UI-035", name: "CarrierTrackingModule",     version: "1.0.0", description: "Live carrier tracking event feed.",                 releaseState: "live"   },
  { id: "UI-036", name: "CarrierSLAModule",          version: "1.0.0", description: "SLA compliance scorecard.",                        releaseState: "live"   },
  { id: "UI-037", name: "CarrierRiskModule",         version: "1.0.0", description: "Carrier risk assessment view.",                     releaseState: "review" },
  { id: "UI-038", name: "CarrierInvoiceModule",      version: "1.0.0", description: "Invoice reconciliation panel.",                    releaseState: "live"   },
  { id: "UI-039", name: "CarrierClaimModule",        version: "1.0.0", description: "Claims tracking panel.",                           releaseState: "live"   },
  { id: "UI-040", name: "CarrierAuditModule",        version: "1.0.0", description: "Audit trail panel for carrier assessments.",        releaseState: "live"   },
  { id: "UI-041", name: "OrderQueueModule",          version: "1.0.0", description: "Active order queue display.",                      releaseState: "live"   },
  { id: "UI-042", name: "OrderStatusModule",         version: "1.0.0", description: "Order fulfilment status tracker.",                  releaseState: "live"   },
  { id: "UI-043", name: "OrderExceptionModule",      version: "1.0.0", description: "Order exception alert panel.",                      releaseState: "live"   },
  { id: "UI-044", name: "OrderCostModule",           version: "1.0.0", description: "Order cost breakdown view.",                       releaseState: "live"   },
  { id: "UI-045", name: "OrderDeliveryModule",       version: "1.0.0", description: "Delivery confirmation and POD panel.",              releaseState: "live"   },
  { id: "UI-046", name: "OrderTraceModule",          version: "1.0.0", description: "End-to-end order trace view.",                     releaseState: "live"   },
  { id: "UI-047", name: "NetworkCongestionModule",   version: "1.0.0", description: "Network congestion heatmap.",                      releaseState: "live"   },
  { id: "UI-048", name: "SystemHealthModule",        version: "1.0.0", description: "Integration system health dashboard.",              releaseState: "live"   },
  { id: "UI-049", name: "SystemFreshnessModule",     version: "1.0.0", description: "Data freshness indicator across all feeds.",        releaseState: "live"   },
  { id: "UI-050", name: "SystemLineageModule",       version: "1.0.0", description: "Source lineage explorer panel.",                   releaseState: "live"   },
];

// ---------------------------------------------------------------------------
// MAP CARD REGISTRY — 12 entries
// Build Rule 4: map cards explain results only; they do NOT emit decisions.
// ---------------------------------------------------------------------------
export const MAP_CARD_REGISTRY: CardDescriptor[] = [
  { id: "MC-001", name: "RouteIntelligenceMapCard",     version: "1.0.0", description: "Explains route capacity, availability and utilisation results.",        releaseState: "live"   },
  { id: "MC-002", name: "VehicleIntelligenceMapCard",   version: "1.0.0", description: "Explains vehicle status, location and compliance results.",             releaseState: "live"   },
  { id: "MC-003", name: "WarehouseIntelligenceMapCard", version: "1.0.0", description: "Explains warehouse capacity, throughput and alert results.",            releaseState: "live"   },
  { id: "MC-004", name: "CarrierIntelligenceMapCard",   version: "1.0.0", description: "Explains carrier performance, SLA and availability results.",           releaseState: "live"   },
  { id: "MC-005", name: "OrderIntelligenceMapCard",     version: "1.0.0", description: "Explains order priority, exception and delivery results.",              releaseState: "live"   },
  { id: "MC-006", name: "DemandIntelligenceMapCard",    version: "1.0.0", description: "Explains demand forecast and volatility results.",                      releaseState: "review" },
  { id: "MC-007", name: "NetworkIntelligenceMapCard",   version: "1.0.0", description: "Explains network congestion and capacity results.",                     releaseState: "live"   },
  { id: "MC-008", name: "ComplianceMapCard",            version: "1.0.0", description: "Explains compliance status across route, vehicle and carrier records.", releaseState: "live"   },
  { id: "MC-009", name: "CostIntelligenceMapCard",      version: "1.0.0", description: "Explains cost aggregation results across all domains.",                 releaseState: "live"   },
  { id: "MC-010", name: "RiskIntelligenceMapCard",      version: "1.0.0", description: "Explains composite risk scores derived from verified evidence.",        releaseState: "review" },
  { id: "MC-011", name: "DataQualityMapCard",           version: "1.0.0", description: "Explains data freshness, confidence and missing-input results.",        releaseState: "live"   },
  { id: "MC-012", name: "LineageMapCard",               version: "1.0.0", description: "Explains full source lineage from raw record to map output.",           releaseState: "live"   },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------
export function getEngineCard(id: string): CardDescriptor | undefined {
  return ENGINE_CARD_REGISTRY.find((c) => c.id === id);
}

export function getMapCard(id: string): CardDescriptor | undefined {
  return MAP_CARD_REGISTRY.find((c) => c.id === id);
}

export function getUIModule(id: string): CardDescriptor | undefined {
  return UI_MODULE_REGISTRY.find((c) => c.id === id);
}
